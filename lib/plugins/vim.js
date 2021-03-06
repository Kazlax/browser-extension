import ghShorthand from 'github-url-from-username-repo';
import giturl from 'giturl';
import { VIM_PLUGIN } from '../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../insert-link';
import preset from '../pattern-preset';

export default class Vim {

  static resolve({ shorthand }) {
    // Logic adapted from https://github.com/VundleVim/Vundle.vim/blob/11fdc428fe741f4f6974624ad76ab7c2b503b73e/doc/vundle.txt#L196
    const components = shorthand.split('/');

    // GitHub is used when a user/repo is passed to `Plugin`.
    if (components.length === 2) {
      return ghShorthand(shorthand, true);
    }
    // Any single word without a slash '/' is assumed to be from Vim Scripts.
    if (components.length === 1) {
      return ghShorthand(`vim-scripts/${shorthand}`, true);
    }
    // Assume it's a URL otherwise. We can't link to git/ssh, so change to https
    // and hope it works.
    return giturl.parse(shorthand);
  }

  getPattern() {
    return preset('Vim');
  }

  parseBlob(blob) {
    insertLink(blob.el, VIM_PLUGIN, {
      pluginName: this.constructor.name,
      shorthand: '$1',
    });
  }
}
