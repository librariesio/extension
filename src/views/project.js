const yo = require('yo-yo')

module.exports = ({ url, name, project }) => yo`
  <div>
    <h2><a href="${url}" target="_blank">${name}</a></h2>
    <p>${project.description}</p>
    <ul>
      <li>SourceRank: <a href="${url}/sourcerank" target="_blank">${project.rank}</a></li>
      <li>Stars: ${project.stars}</li>
      <li>Forks: ${project.forks}</li>
      <li>Language: ${project.language}</li>
      <li>Latest release: ${project.latest_release_published_at}</li>
      <li>License: ${project.normalized_licenses}</li>
      <li>Repo: <a href="${project.repository_url}" target="_blank">${project.repository_url}</a></li>
      <li>Homepage: <a href="${project.homepage}" target="_blank">${project.homepage}</a></li>
    </ul>
  </div>
`
