function writeCode(prefix,code,fn) {
    let domCode =  document.querySelector('#code')
    domCode.innerHTML = prefix || ''
    var n = 0
    var id = setInterval(() => {
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)
        styleTag.innerHTML = prefix + code.substring(0, n)
        domCode.scrollTop = domCode.scrollHeight
        if (n >= code.length) {
            window.clearInterval(id)
            fn&&fn.call()
        }
    }, 70)
    
}

function writeMarkdown(markdown,fn){
    let domPaper = document.querySelector('#paper > .content')
    var n = 0
    var id = setInterval(() => {
        n += 1
        domPaper.innerHTML = markdown.substring(0, n)
        domPaper.scrollTop = domPaper.scrollHeight
        if (n >= markdown.length) {
            window.clearInterval(id)
            fn&&fn.call()
        }
    }, 35)
}


var css1 = `/*
* 面试官你好，我是梁光静
* 我将以动画的形式来介绍我自己
* 只用文字介绍太单调了
* 我就用代码来介绍吧
* 首先准备一些样式
*/

*{
    transition: all 1s;
}
html{
    background: rgb(222,222,222);
    font-size: 16px;
}
#code{
    border: 1px solid red;
    padding: 16px;
}

/* 我需要一些代码高亮 */
.token.selector {
    color: #690;
}
.token.property {
    color: #905;
}
.token.function {
    color: #DD4A68;
}

/* 加点一个呼吸效果 */
#code{
    animation: breath 0.5s infinite alternate-reverse;
}

/* 现在正式开始 */
/* 我需要一张白纸 */

`

var css2 = `
#code-wrapper{
    position: fixed;
    left: 0;
    width: 50%;
    height: 100%;
}
#paper > .content{
    display: block;
}
/* 于是我就可以在白纸上写字了，请看右边 */
`

var css3 = `
/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
`

var css4 = `
/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`


var md = `
# 自我介绍

我叫梁光静， 
1993年10月出生， 
2016年6月毕业于xx大学， 
毕业后进入xx工作两年，
自学前端半年， 
希望应聘前端开发岗位  

# 技能介绍
熟悉 HTMl CSS JavaScript HTTP jQuery

# 项目介绍
1. xxx 在线简历
2. xxx 无缝轮播
3. xxx 自制画板

# 联系方式
- qq
- 手机
- Email

`


writeCode('',css1,() => {
    createPaper(() => {
        writeCode(css1,css2,() => {
            writeMarkdown(md,() =>{
                writeCode(css1+css2,css3,() => {
                    convertMarkdownToHtml(() => {
                        writeCode(css1+css2+css3,css4)
                    })
                })
            })
        })
    })
})

function createPaper (fn) {
  var paper = document.createElement('div')
  paper.id = 'paper'
  document.body.appendChild(paper)
  var content = document.createElement('pre')
  content.className = 'content'
  paper.appendChild(content)
  fn&&fn.call()
}

function convertMarkdownToHtml(fn){
    var div = document.createElement('div')  
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.replaceWith(div)
    fn && fn.call()
  }
