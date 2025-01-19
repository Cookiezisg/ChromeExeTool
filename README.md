# Chrome 标签页自动化工具

这个工具可以自动化打开 Chrome 浏览器，并按照预设的顺序打开特定的标签页。

## 功能

- 打开 Chrome 浏览器
- 自动打开预设的 6 个标签页
- 通过 Chrome 扩展自动固定标签页
- 在最右侧打开一个新的标签页

## 安装步骤

### 1. 安装 Chrome 扩展

1. 打开 Chrome 浏览器
2. 进入 `chrome://extensions/`
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择项目中的 `chrome_extension` 文件夹

### 2. 安装 Python 程序

1. 安装 Python (3.7 或更高版本)
2. 安装依赖包：
   ```
   pip install -r requirements.txt
   ```

## 使用方法

1. 确保 Chrome 扩展已经安装并启用
2. 直接双击 `launch_chrome.bat` 文件运行程序

## 注意事项

- 确保 Chrome 浏览器已经安装
- 程序会使用你当前的 Chrome 用户配置文件
- 扩展会自动固定指定的标签页
- 如果标签页没有立即固定，请等待几秒钟
