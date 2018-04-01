# Project Atlas

### Installing/Running

```
$ git clone https://github.com/hozefaj/atlas.git
$ cd atlas
$ npm install
$ npx webpack
// running local dev server
$ webpack-dev-server
```

Static version of the site can be viewed at http://barbarous-ray.surge.sh/

### Considerations

1. The public API, I have used sometimes does not give images of fix dimension
2. For the sake of simplicity I am getting 28(multiple of 4) images and showing their thumbnails. This is to align with the grid.
3. To further expand this, we can use pagination to make further calls. But personally using a view framework would make it much simpler to scale this.
