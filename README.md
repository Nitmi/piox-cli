# piox-cli

一个旨在简化和加速 PlatformIO 项目初始化流程的命令行工具。它能自动创建项目目录，为指定的开发板初始化 PlatformIO 项目，并随后在 VSCode 中打开该项目。

## 解决了什么问题？

`piox-cli` 旨在解决使用 VSCode PlatformIO 插件创建项目时的两个主要痛点：

1.  **简化创建流程**：在 PlatformIO 插件中创建项目需要点击多个步骤，流程繁琐。此 CLI 工具通过一行命令即可完成所有操作。
2.  **优化后续操作**：项目创建后，插件的默认行为是打开文件资源管理器或将项目添加到当前工作区。最理想的方式是直接在一个新的 VSCode 窗口中打开项目，而 `piox-cli` 正是为此设计的。

## 安装 (Installation)

```bash
npm install -g piox-cli
```

## 用法 (Usage)

```sh
piox <board_type> <project_name>
```

*   `<board_type>`: 目标开发板的快捷方式。
*   `<project_name>`: 新项目的名称，也将作为目录名。

## 支持的开发板 (Supported Boards)

| 快捷方式 (Shortcut) | PlatformIO 开发板 ID (Board ID) |
| ------------------- | ------------------------------- |
| `s3`                | `esp32-s3-devkitc-1`            |
| `c3`                | `esp32-c3-devkitc-02`           |
| `52840`             | `nrf52840_dk`                   |
| `52832`             | `adafruit_feather_nrf52832`     |

## 示例 (Example)

要为一个 `esp32-s3-devkitc-1` 开发板创建一个名为 `my-esp32-project` 的新项目，请运行以下命令：

```sh
piox s3 my-esp32-project
