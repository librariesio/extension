function getCurrentTabUrl(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    callback(tabs[0].url);
  });
}

var platformRegexes = {
  rubygems: /rubygems\.org\/gems\/([A-Za-z0-9\-_\.]+)/i,
  npm: /npmjs\.com\/package\/([A-Za-z0-9\-_\.]+)/i, // scoped modules: /npmjs\.com\/package\/(@[a-z0-9][\w-.]+\/)?([a-z0-9\w-.]+)/i
  packagist: /packagist\.org\/packages\/([A-Za-z0-9\-_\.\/]+)/i,
  pypi: /pypi\.python\.org\/pypi\/([A-Za-z0-9\-_\.]+)/i,
  nuget: /nuget\.org\/packages\/([A-Za-z0-9\-_\.]+)/i,
  wordpress: /wordpress\.org\/plugins\/([A-Za-z0-9\-_\.]+)/i,
  cpan: /metacpan\.org\/release\/([A-Za-z0-9\-_\.]+)/i,
  cocoapods: /cocoapods\.org\/pods\/([A-Za-z0-9\-_\.]+)/i,
  cran: /cran\.r-project\.org\/web\/packages\/([A-Za-z0-9\-_\.]+)/i,
  hackage: /hackage\.haskell\.org\/package\/([A-Za-z0-9\-_\.]+)/i,
  atom: /atom\.io\/packages\/([A-Za-z0-9\-_\.]+)/i,
  cargo: /crates\.io\/crates\/([A-Za-z0-9\-_\.]+)/i,
  homebrew: /brewformulas\.org\/([A-Za-z0-9\-_\.]+)/i,
  hex: /hex\.pm\/packages\/([A-Za-z0-9\-_\.]+)/i,
  emacs: /melpa\.org\/#\/([A-Za-z0-9\-_\.]+)/i,
  pub: /pub\.dartlang\.org\/packages\/([A-Za-z0-9\-_\.]+)/i,
  dub: /code\.dlang\.org\/packages\/([A-Za-z0-9\-_\.]+)/i,
  haxelib:/lib\.haxe\.org\/p\/([A-Za-z0-9\-_\.]+)/i,
  inqlude: /inqlude\.org\/libraries\/([A-Za-z0-9\-_\.]+)\.html/i,
}

var hostRegexes = {
  github: /github\.com\/([-_\w]+)\/([-_.\w]+)/i,
  gitlab: /gitlab\.com\/([-_\w]+)\/([-_.\w]+)/i,
  bitbucket: /bitbucket\.org\/([-_\w]+)\/([-_.\w]+)/i,
}

function parsePackageInfo(url) {
  for (var platform in platformRegexes) {
    var regex = platformRegexes[platform]
    if (url.match(regex)){
      return {
        name: url.match(regex)[1],
        platform: platform
      }
    }
  }
}

function parseRepoInfo(url) {
  for (var host in hostRegexes) {
    var regex = hostRegexes[host]
    if (url.match(regex)){
      var match = url.match(regex)
      return {
        name: match[1] + '/' + match[2],
        host_type: host
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    var info = parsePackageInfo(url)
    if (info){
      var api_url = 'https://libraries.io/api/'+info.platform + '/' + encodeURIComponent(info.name)
      var librariesUrl = 'https://libraries.io/'+info.platform + '/' + encodeURIComponent(info.name)

      jQuery.get(api_url, function(data){
        $('#status').html('<a href="'+librariesUrl+'" target="_blank">'+info.name + '</a><p>' + data.description + '</p>' + ' SourceRank: '+ data.rank)
      })
    } else {
      var info = parseRepoInfo(url)
      var api_url = 'https://libraries.io/api/'+info.host_type + '/' + info.name
      var librariesUrl = 'https://libraries.io/'+info.host_type + '/' + info.name
      jQuery.get(api_url, function(data){
        $('#status').html('<a href="'+librariesUrl+'" target="_blank">'+info.name + '</a><p>' + data.description + '</p>' + ' SourceRank: '+ data.rank)
      })
      jQuery.get(api_url+'/projects', function(projects){
        jQuery.each(projects, function(index, project){
          var librariesUrl = 'https://libraries.io/'+project.platform + '/' + encodeURIComponent(project.name)
          $('#projects').append('<li>'+ project.platform + ' - <a href="'+librariesUrl+'" target="_blank">'+project.name + '</a></li>')
        })
      })
    }
  });
});
