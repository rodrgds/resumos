import { visit } from 'unist-util-visit';

const labels = {
  note: 'Nota',
  info: 'Informação',
  tip: 'Dica',
  warning: 'Atenção',
  danger: 'Cuidado',
  details: 'Ver solução',
};

export default function remarkContainers() {
  return (tree, file) => {
    visit(tree, 'containerDirective', (node) => {
      if (!(node.name in labels))
        file.fail(`Container desconhecido: ${node.name}`, node);
      const collapsible = node.name === 'details';
      const label = node.children[0]?.data?.directiveLabel
        ? node.children.shift()
        : {
            type: 'paragraph',
            children: [{ type: 'text', value: labels[node.name] }],
          };
      label.data = {
        ...label.data,
        hName: collapsible ? 'summary' : 'p',
        hProperties: { className: ['admonition-title'] },
      };
      node.data = {
        hName: collapsible ? 'details' : 'aside',
        hProperties: { className: ['admonition', `admonition-${node.name}`] },
      };
      node.children.unshift(label);
    });
    visit(tree, 'leafDirective', (node) => {
      if (node.name !== 'image')
        file.fail(`Diretiva desconhecida: ${node.name}`, node);
      const { src, alt, dark = 'original' } = node.attributes || {};
      if (!src || !alt) file.fail('::image exige src e alt.', node);
      if (!['original', 'dim', 'invert'].includes(dark))
        file.fail('Usa dark="original", "dim" ou "invert".', node);
      node.data = {
        hName: 'img',
        hProperties: {
          src,
          alt,
          loading: 'lazy',
          decoding: 'async',
          className: ['content-image'],
          'data-dark-image': dark,
        },
      };
    });
  };
}
