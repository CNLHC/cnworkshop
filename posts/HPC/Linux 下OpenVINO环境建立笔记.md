---
layout: post
title: Linux下 OpenVINO环境建立笔记
codeName: Linux-openvino-startup-Guide
author: CNLHC
date: 2019-07-02T08:33:47.149Z
---

## 程序及参考资料

[Install Intel® Distribution of OpenVINO™ toolkit for Linux* with FPGA Support](https://docs.openvinotoolkit.org/latest/_docs_install_guides_installing_openvino_linux_fpga.html)
 
## 核心组件安装

### 环境准备

注意安装前的环境准备

```shell
sudo apt install -y libpango1.0-dev libglib2.0-dev libgtk2.0-dev libswscale-dev libavcodec-dev libavformat-dev
```

### 开始安装

安装时可能会提示下列警告，暂时先忽略他们。

```shell
-- Intel® GPU is not detected on this machine
-- Intel® Graphics Compute Runtime for OpenCL™ Driver is missing but you will
be prompted to install later
```

安装完成后需要手动安装其他依赖。切换到安装目录，执行intel预设的脚本。

1. 本质上这个脚本是调用系统包管理器安装依赖，注意联网
2. 本文的安装目录是 `/opt/openvino`

```shell
cd /opt/openvino/openvino/install_dependencies
sudo -E ./install_openvino_dependencies.sh
```

此外还需要安装模型优化器的依赖项。此处选择全部安装。

注意执行安装前最好先更新一下 `setuptools`, 否则可能会报错。

```shell
 pip3 install setuptools --upgrade
```

```shell
cd /opt/openvino/openvino/install_dependencies
sudo ./install_prerequisites.sh
```

### 安装完成后测试

自带一个图像分类脚本,可以用来测试安装完整性。这个脚本会下载`SqueezeNet`模型，使用模型优化器将该模型转换成 .bin和 .xml格式的中间表示,
利用该中间表示，Intel提供的硬件可以提供硬件加速功能。

```shell
cd /opt/openvino/openvino/deployment_tools/demo
./demo_squeezenet_download_convert_run.sh
```

测试图像

![2019-07-04-12-09-47](http://oss.cnworkshop.xyz/images/231a685e3d337933c303af6565246d77.png)

输出

```plain
classid probability label
------- ----------- -----
817     0.8363345   sports car, sport car
511     0.0946484   convertible
479     0.0419131   car wheel
751     0.0091071   racer, race car, racing car
436     0.0068161   beach wagon, station wagon, wagon, estate car, beach waggon, station waggon, waggon
656     0.0037564   minivan
586     0.0025741   half track
717     0.0016069   pickup, pickup truck
864     0.0012027   tow truck, tow car, wrecker
581     0.0005882   grille, radiator grille
```

换一张测试图片

![2019-07-04-12-09-25](http://oss.cnworkshop.xyz/images/fbd21a75b65eef3cb6199d888d69e4a2.png)

测试输出

```plain
classid probability label
------- ----------- -----
889     0.8037972   violin, fiddle
402     0.1642741   acoustic guitar
546     0.0175070   electric guitar
486     0.0141077   cello, violoncello
600     0.0001988   hook, claw
777     0.0000546   scabbard
420     0.0000318   banjo
683     0.0000051   oboe, hautboy, hautbois
845     0.0000046   syringe
512     0.0000031   corkscrew, bottle screw
```
