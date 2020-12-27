// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { OctoprintService } from '../octoprint.service';
import { PrinterService } from '../printer.service';

@Component({
  selector: 'app-filament-control',
  templateUrl: './filament-control.component.html',
  styleUrls: ['./filament-control.component.scss'],
})
export class FilamentControlComponent {
  public customActions = [];
  public actionToConfirm: ActionToConfirm;

  public constructor(
    private printerService: PrinterService,
    private octoprintService: OctoprintService,
    private router: Router,
  ) {
    this.customActions = [
      {
        icon: 'fire-alt',
        command: 'M140 S80; M104 S200',
        color: '#e1b12c',
        confirm: false,
        exit: true,
        label: 'Home',
      },
    ];
  }

  public doAction(command: string, exit: boolean, confirm: boolean): void {
    if (confirm) {
      this.actionToConfirm = {
        command,
        exit,
      };
    } else {
      this.executeGCode(command);
      if (exit) {
        this.router.navigate(['/main-screen']);
      }
    }
  }

  public doActionConfirm(): void {
    this.executeGCode(this.actionToConfirm.command);
    if (this.actionToConfirm.exit) {
      this.router.navigate(['/main-screen']);
    } else {
      this.actionToConfirm = null;
    }
  }

  public doActionNoConfirm(): void {
    this.actionToConfirm = null;
  }

  private executeGCode(command: string): void {
    switch (command) {
      case '[!DISCONNECT]':
        this.disconnectPrinter();
        break;
      case '[!STOPDASHBOARD]':
        this.stopOctoDash();
        break;
      case '[!RELOAD]':
        this.reloadOctoPrint();
        break;
      case '[!REBOOT]':
        this.rebootPi();
        break;
      case '[!SHUTDOWN]':
        this.shutdownPi();
        break;
      case '[!KILL]':
        this.kill();
        break;
      default: {
        this.printerService.executeGCode(command);
        break;
      }
    }
  }

  // [!DISCONNECT]
  public disconnectPrinter(): void {
    this.octoprintService.disconnectPrinter();
  }

  // [!STOPDASHBOARD]
  public stopOctoDash(): void {
    window.close();
  }

  // [!RELOAD]
  public reloadOctoPrint(): void {
    this.octoprintService.sendSystemCommand('restart');
  }

  // [!REBOOT]
  public rebootPi(): void {
    this.octoprintService.sendSystemCommand('reboot');
  }

  // [!SHUTDOWN]
  public shutdownPi(): void {
    this.octoprintService.sendSystemCommand('shutdown');
  }

  // [!KILL]
  public kill(): void {
    this.shutdownPi();
    setTimeout(this.stopOctoDash, 500);
  }
}

interface ActionToConfirm {
  command: string;
  exit: boolean;
}
