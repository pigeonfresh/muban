module.exports = {
  title: 'Home',
  meta: {
    id: '', // can be number or string, used for ordering
    status: '', // dev, qa, feedback, done
    notes: '', // add some information about the page
    category: '', // to group pages in the overview
  },
  blocks: [
    {
      name: 'header',
      data: {},
    },
    {
      name: 'paragraph',
      data: 'import!../app/component/block/paragraph/data.js',
    },
    {
      name: 'two-col',
      data: 'import!../app/component/block/two-col/data.yaml',
    },
    {
      name: 'footer',
      data: {},
    },
  ],
};
