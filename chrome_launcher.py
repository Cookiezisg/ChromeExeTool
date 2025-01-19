import subprocess
import time
import keyboard


def launch_chrome():
    # Chrome可执行文件路径和工作目录
    chrome_path = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    chrome_dir = "C:\\Program Files\\Google\\Chrome\\Application"
    
    # 首先打开一个空白的Chrome窗口
    subprocess.Popen([
        chrome_path,
        '--profile-directory=Profile 1',
        '--new-window',
        'chrome://newtab'
    ], cwd=chrome_dir)
    
    # 等待Chrome启动（减少等待时间）
    time.sleep(0.5)
    
    # 模拟按下Alt+Shift+C来触发清理
    keyboard.press_and_release('alt+shift+c')
    
    # 等待清理完成（减少等待时间）
    time.sleep(1)
    
    # 要打开的网址列表
    urls = [
        "https://mail.google.com/mail/u/0/#inbox",
        "https://calendar.google.com/calendar/u/0/r",
        "https://drive.google.com/drive/u/0/my-drive",
        "https://datasuite.shopee.io/studio",
        "https://datasuite.shopee.io/datamap/home",
        "chrome://newtab"
    ]
    
    # 构建Chrome启动命令
    cmd = [
        chrome_path,
        '--profile-directory=Profile 1',
        '--start-maximized',
        '--no-first-run',            # 跳过首次运行检查
        '--no-default-browser-check' # 跳过默认浏览器检查
    ] + urls
    
    # 启动Chrome，打开所有标签页
    subprocess.Popen(cmd, cwd=chrome_dir)


if __name__ == "__main__":
    launch_chrome() 