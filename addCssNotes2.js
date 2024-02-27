// import fs from 'fs';
// import path from 'path';

const fs = require('fs');
const path = require('path');

// 读取.vue文件
fs.readdir('.', (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    // 筛选出.vue文件
    const vueFiles = files.filter(file => path.extname(file) === '.vue');

    // 遍历每一个.vue文件
    vueFiles.forEach(file => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            // 正则表达式匹配<style>标签中的CSS内容以及其中的属性
            const cssRegex = /<style([^>]*)>([\s\S]*?)<\/style>/;
            const match = data.match(cssRegex);

            if (match) {
                const attributes = match[1];
                const cssContent = match[2];
                // 将CSS内容按行分割成数组
                const cssLines = cssContent.split('\n');

                // 添加注释和换行
                const commentedCSSLines = cssLines.map(line => {
                    // 去除首尾空格
                    const trimmedLine = line.trim();
                    // 如果行为空，直接返回
                    if (!trimmedLine) return line;

                    // 添加注释
                    let commentedLine = line;
                    // 检查每一行是否含有常见的CSS属性，并为其添加注释

                    if (trimmedLine.includes('line-height:')) {
                        commentedLine = `/** 行高；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('width:')) {
                        commentedLine = `/** 宽度；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('height:')) {
                        commentedLine = `/** 高度；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('padding:')) {
                        commentedLine = `/** 内边距；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('overflow:')) {
                        commentedLine = `/** 浮动；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('white-space:')) {
                        commentedLine = `/** 文字间距设置；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('text-shadow:')) {
                        commentedLine = `/** 文字阴影设置；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('justify-content:')) {
                        commentedLine = `/** 水平居中方式；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('align-items:')) {
                        commentedLine = `/** 垂直居中方式；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('background:')) {
                        commentedLine = `/** 背景设置；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('transform:')) {
                        commentedLine = `/** 缩放设置；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('position:')) {
                        commentedLine = `/** 布局方式；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('box-shadow:')) {
                        commentedLine = `/** 盒子阴影；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('border:')) {
                        commentedLine = `/** 边框设置；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('display:')) {
                        commentedLine = `/** 布局方式；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('background-image:')) {
                        commentedLine = `/** 背景图片设置；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('background-size:')) {
                        commentedLine = `/** 背景尺寸；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('top:')) {
                        commentedLine = `/** 距顶部距离；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('left:')) {
                        commentedLine = `/** 距左侧距离；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('right:')) {
                        commentedLine = `/** 距右侧距离；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('bottom:')) {
                        commentedLine = `/** 距底部距离；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('font-size:')) {
                        commentedLine = `/** 字号；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('font-family:')) {
                        commentedLine = `/** 字体样式；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('font-weight:')) {
                        commentedLine = `/** 字重大小；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('color:')) {
                        commentedLine = `/** 字体颜色；*/\n ${trimmedLine}`;
                    } else if (trimmedLine.includes('text-align:')) {
                        commentedLine = `/** 文字水平居中方式；*/\n ${trimmedLine}`;
                    }

                    return commentedLine;
                });

                // 将注释后的CSS内容重新组合
                const commentedCSSContent = commentedCSSLines.join('\n');

                // 将注释后的CSS内容替换原来的CSS内容
                const commentedVueFile = data.replace(cssRegex, `<style ${attributes}>${commentedCSSContent}</style>`);

                // 生成新的文件名，添加_result.vue后缀
                const newFileName = `${path.basename(file, '.vue')}_result.vue`;

                // 将更新后的.vue文件写入新文件中
                fs.writeFile(newFileName, commentedVueFile, 'utf8', (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log(`已添加注释并换行到 ${newFileName} 中。`);
                });
            } else {
                console.log(`${file} 中未找到 CSS 内容。`);
            }
        });
    });
});
