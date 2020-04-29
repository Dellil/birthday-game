/**
 * ENTRY GATE IS HERE!
 * 2020/04/23
 * Chanhee Jang
 */
import phaser from 'phaser';
import StageManager from './scenes/StageManagerScene.js'


const Phaser = phaser;
let audioContext = new AudioContext();

let config = {
    type: Phaser.AUTO,
    title: "Birthday Game - Prototype ver.",
    version: "1.0.0",
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            debugShowBody: true,
        }
    },
    input: {
        keyboard: true,
        mouse: true,
        touch: false
    },
    scene: StageManager,
    fps: {
        min: 60,
        target: 60
    },
    audio: {
        context: audioContext
    }
};

let game = new Phaser.Game(config);