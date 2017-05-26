const platformRegexes = require('./platforms')
const hostRegexes = require('./hosts')

const yo = require('yo-yo')
const root = yo`<div>Loading…</div>`
const render = (update) => yo.update(root, update)

const projectView = require('./views/project')
const repoView = require('./views/repo')

// returns a Promise that will resolve with the url of the current tab
const getCurrentTabUrl = () => new Promise((resolve) =>
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => resolve(tabs[0].url))
)

const parsePackageInfo = url => {
  for (const platform in platformRegexes) {
    const matches = url.match(platformRegexes[platform])
    if (matches) return { name: matches[1], platform: platform, isPlatform: true }
  }
}

const parseRepoInfo = url => {
  for (var host in hostRegexes) {
    const matches = hostRegexes[host]
    if (matches) return { name: matches[1] + '/' + matches[2], host: host, isPlatform: false }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(root)
  getCurrentTabUrl().then(url => {
    const info = parsePackageInfo(url) || parseRepoInfo(url)
    if (!info) return yo.update(root, yo`<div>no info</div>`)
    if (info.platform) {
      const api_url = `https://libraries.io/api/${info.platform}/${encodeURIComponent(info.name)}`
      const librariesUrl = `https://libraries.io/${info.platform}/${encodeURIComponent(info.name)}`
      return fetch(api_url)
        .then(res => res.json())
        .then(data => {
          render(projectView({ name: info.name, url: librariesUrl, project: data }))
        })
    }
    const api_url = `https://libraries.io/api/${info.host}/${info.name}`
    const librariesUrl = `https://libraries.io/${info.host}/${info.name}`
    return fetch(api_url)
      .then(res => res.json())
      .then(data => {
        render(repoView({ name: info.name, url: librariesUrl, project: data }))
      })
  })
})
