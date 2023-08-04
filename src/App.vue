<template>
  <div class="ve-tree" style="height: calc(100vh - 20px)">
    <big-data-tree
      ref="veTree"
      node-key="id"
      :data="treeData"
      :props="props"
      :item-size="26"
      height="calc(100vh - 30px)"
      show-checkbox
    >
    </big-data-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        children: "children",
      },
      treeData: [],
    };
  },
  created() {
    const data = [],
      root = 8,
      children = 3,
      base = 1000;
    for (let i = 0; i < root; i++) {
      data.push({
        id: `${i}`,
        name: `test-${i}`,
        total: root,
        children: [],
      });
      for (let j = 0; j < children; j++) {
        data[i].children.push({
          id: `${i}-${j}`,
          name: `test-${i}-${j}`,
          total: 3,
          children: [],
        });
        for (let k = 0; k < base; k++) {
          data[i].children[j].children.push({
            id: `${i}-${j}-${k}`,
            name: `test-${i}-${j}-${k}`,
            total: 20000,
          });
        }
      }
    }
    this.treeData = data;
  },
};
</script>

