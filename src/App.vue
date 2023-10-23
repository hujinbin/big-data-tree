<template>
  <div class="ve-tree">
    <div class="ve-tree-flex">
    <h4>数据全量加载</h4>
    <big-data-tree
      node-key="id"
      :data="treeData"
      :props="props"
      :item-size="26"
      height="calc(100vh - 100px)"
      show-checkbox
    >
    </big-data-tree>
  </div>
  <div class="ve-tree-flex">
    <h4>数据分段加载</h4>
    <big-data-tree
      node-key="id"
      :props="props"
      :item-size="26"
      :load="loadNode"
      lazy
      height="calc(100vh - 100px)"
      show-checkbox
    >
    </big-data-tree>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        children: "children",
        isLeaf: 'isLeaf'
      },
      treeData: [],
      lazyTreeData:[],
      treeMap:{},
    };
  },
  created() {
    const data = [],
      lazyData = [],
      root = 8,
      children = 3,
      base = 1000;
    for (let i = 0; i < root; i++) {
      data.push({
        id: `${i}`,
        name: `test-${i}`,
        total: children,
        children: [],
      });
      lazyData.push({
        id: `${i}`,
        name: `test-${i}`,
        total: children,
        children: [],
      })
      let level2 = []
      for (let j = 0; j < children; j++) {
        data[i].children.push({
          id: `${i}-${j}`,
          name: `test-${i}-${j}`,
          total: base,
          children: [],
        });
        level2.push({
          id: `${i}-${j}`,
          name: `test-${i}-${j}`,
          total: base,
          children: [],
        })
        let level3 = []
        for (let k = 0; k < base; k++) {
          data[i].children[j].children.push({
            id: `${i}-${j}-${k}`,
            name: `test-${i}-${j}-${k}`,
            total: 0,
          });
          level3.push({
            id: `${i}-${j}-${k}`,
            name: `test-${i}-${j}-${k}`,
            total: 0,
            isLeaf: true,
          })
        }
        this.treeMap[`${i}-${j}`] = level3
      }
      this.treeMap[`${i}`] = level2
    }
    console.log(lazyData)
    this.treeData = data;
    this.lazyTreeData = lazyData;
  },
  methods:{
    // 模拟数据请求
    loadNode(node, resolve) {
        console.log(node)
        if (node.level === 0) {
          return resolve(this.lazyTreeData);
        }
        if (node.level > 2) return resolve([]);
        setTimeout(() => {
          const children = this.treeMap[node.data.id];
          resolve(children);
        }, 500);
     }
  }
};
</script>


<style scoped>
.ve-tree{
  display: flex;
}
.ve-tree-flex{
  flex: 1;
}
</style>
