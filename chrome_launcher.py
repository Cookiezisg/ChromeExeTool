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
        '--start-maximized',
        'chrome://newtab'
    ], cwd=chrome_dir)
    
    # 等待Chrome启动
    time.sleep(1)
    
    # 模拟按下Alt+Shift+C来触发清理和打开标签页
    keyboard.press_and_release('alt+shift+c')


if __name__ == "__main__":
    launch_chrome() 