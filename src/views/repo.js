const yo = require('yo-yo')

module.exports = ({ url, name, project }) => yo`
  <div>
    <h3><a href="${url}" target="_blank">${name}</a></h3>
    <p>${project.description}</p>

    <ul>
      <li>SourceRank: ${project.rank}</li>
      <li>License: ${project.license}</li>
      <li>SCM: ${project.scm}</li>
      <li>Size: ${project.size}kb</li>
      <li>Created: ${project.created_at}</li>
      <li>Contributors: ${project.contributions_count}</li>
    </ul>
  </div>
`
