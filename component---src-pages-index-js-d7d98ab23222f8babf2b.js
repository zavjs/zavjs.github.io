webpackJsonp([35783957827783],{209:function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0,e.query=void 0;var n=a(2),l=r(n),o=a(213),u=r(o),s=function(t){var e=t.data,a=e.allMarkdownRemark.edges;return l.default.createElement("div",{className:"post-list"},a&&a.length&&a.sort(function(t,e){var a=t.node&&t.node.frontmatter&&t.node.frontmatter.sortDate,r=e.node&&e.node.frontmatter&&e.node.frontmatter.sortDate;return a&&r?Number(r)-Number(a):0}).map(function(t){var e=t.node;return l.default.createElement(u.default,{key:e.frontmatter.path,title:e.frontmatter.title,date:e.frontmatter.humanDate,path:e.frontmatter.path,excerpt:e.frontmatter.excerpt,tags:e.frontmatter.tags})}))};e.query="** extracted graphql fragment **";e.default=s},213:function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var n=a(2),l=r(n),o=a(34),u=r(o),s=function(t){var e=t.title,a=t.date,r=t.path,n=t.excerpt;t.tags;return l.default.createElement("div",{className:"post-list__item"},l.default.createElement("p",{className:"post-list__date"},a),l.default.createElement("h2",{className:"post-list__title"},l.default.createElement(u.default,{to:r},e)),l.default.createElement("p",{className:"post-list__excerpt"},n))};e.default=s,t.exports=e.default}});
//# sourceMappingURL=component---src-pages-index-js-d7d98ab23222f8babf2b.js.map