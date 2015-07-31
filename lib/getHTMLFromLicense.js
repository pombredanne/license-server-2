'use strict';

module.exports = function(repoName, license) {

  return '<!DOCTYPE html>\n' +
  '<html>\n' +
  '<head>\n' +
    '\t<title>' + repoName + '</title>\n' +
  '</head>\n' +
  '<body>\n' +
  traverse(license, 0) +
  '</body>\n' +
  '</html>\n';
};

function traverse(node, depth) {

  if(node && node.dependencies) {

    var out = '';
    var indent = getIndent(depth);
    var indent2 = getIndent(depth + 1);
    var indent3 = getIndent(depth + 2);
    var licenseCopy;
    var dep;

    if(node.dependencies) {

      for(var name in node.dependencies) {
        dep = node.dependencies[ name ];
        licenseCopy = dep && dep.license ? dep.license : 'unable determine license';

        if(dep && dep.dependencies) {
          out += indent2 + '<li>\n' + 
                              indent3 + '<div>' + name + '@' + dep.version + ' - ' + licenseCopy + '</div>\n' +
                              traverse(dep, depth + 2) +
                 indent2 + '</li>\n';
        } else if(dep) {
          out += indent2 + '<li>' + name + '@' + dep.version + ' - ' + licenseCopy + '</li>\n';
        } else {
          out += indent2 + '<li>' + name + '- unable to determine version and license</li>\n';
        }
      }
    }

    return indent + '<ul>\n' + out + indent + '</ul>\n';
  } else {

    return '';
  }
}

function getIndent(depth) {
  return Array.apply(null, Array(depth)).map(String.bind(undefined, '  ')).join('');
}