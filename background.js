// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL is a known package manager
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'rubygems\.org\/gems\/*' },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'npmjs\.com\/package\/*' },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'packagist\.org\/packages\/*' },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'pypi\.python\.org\/pypi\/*' },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'nuget\.org\/packages\/*' },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'wordpress\.org\/plugins\/*' },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'metacpan\.org\/release\/*' },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'cocoapods\.org\/pods\/*' },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'cran\.r-project\.org\/web\/packages\/*' },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'hackage\.haskell\.org\/package\/*' },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'atom\.io\/packages\/*' },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'crates\.io\/crates\/*' },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'brewformulas\.org\/*' },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'hex\.pm\/packages\/*' },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'melpa.org\/*' },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'pub\.dartlang\.org\/packages\/*' },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'code\.dlang\.org\/packages\/*' },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'lib\.haxe\.org\/p\/*' },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'inqlude\.org\/libraries\/*' },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'github\.com\/([-_\\w]+)\\/([-_.\\w]+)' },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'gitlab\.com\/([-_\\w]+)\\/([-_.\\w]+)' },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: 'bitbucket\.org\/([-_\\w]+)\\/([-_.\\w]+)' },
          }),
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});
