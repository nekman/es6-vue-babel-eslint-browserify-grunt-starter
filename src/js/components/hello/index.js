import helloTemplate from './template.html';

export default {
  template: helloTemplate,

  data() {
    return {
      message: 'Hello World',
      items: this.$parent.items
    };
  }
};
