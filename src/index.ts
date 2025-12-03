#!/usr/bin/env bun
import { Command } from "commander";
import { spawnSync } from "child_process";
import { existsSync, mkdirSync } from "fs";
import path from "path";

const program = new Command();

const BOARDS = {
  s3: "esp32-s3-devkitc-1",
  c3: "esp32-c3-devkitc-02",
  52840: "nrf52840_dk",
  52832: "adafruit_feather_nrf52832",
  h743: "weact_mini_h743vitx",
};

const BOARD_OPTIONS: Record<string, string[]> = {
  h743: [
    '--project-option=debug_tool=stlink',
    '--project-option=upload_protocol=stlink'
  ],
};

program
  .name("piox")
  .description("Enhanced PlatformIO project initializer")
  .version("1.0.0");

program
  .argument("<type>", "board type (e.g. s3, c3)")
  .argument("<name>", "project name")
  .action((type, name) => {
    const board = BOARDS[type as keyof typeof BOARDS];
    if (!board) {
      console.error(`❌ Unknown board type: ${type}`);
      console.log(`Available types: ${Object.keys(BOARDS).join(", ")}`);
      process.exit(1);
    }

    const projectPath = path.resolve(process.cwd(), name);

    // 创建文件夹
    if (!existsSync(projectPath)) {
      console.log(`📁 Creating folder: ${name}`);
      mkdirSync(projectPath);
    }

    process.chdir(projectPath);

    // 执行 platformio 初始化命令
    console.log(`⚙️ Initializing PlatformIO project for ${board}...`);
    const args = ["project", "init", "-b", board, "--ide", "vscode", "--sample-code"];
    
    // 添加特定板子的额外选项
    const extraOptions = BOARD_OPTIONS[type];
    if (extraOptions) {
      args.push(...extraOptions);
    }
    
    const result = spawnSync("pio", args, {
      stdio: "inherit",
      shell: true,
    });

    if (result.status !== 0) {
      console.error("❌ pio command failed");
      process.exit(1);
    }

    // 打开 VSCode
    console.log("🧠 Opening VSCode...");
    spawnSync("code", ["."], { stdio: "inherit", shell: true });
  });

program.parse();
