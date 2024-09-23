import { Component } from '@angular/core';
import {
  IToolPanel,
  IToolPanelParams,
  RowNode
} from 'ag-grid-community';

@Component({
  selector: 'custom-stats',
  template: `
    <div style="text-align: center">
      <span>
        <h2><i class="fa fa-calculator"></i> Custom Stats</h2>
      </span>
    </div>
  `,
  styles: [
    `
      .totalStyle {
        padding-bottom: 15px;
      }
    `
  ]
})
export class CustomStatsToolPanel implements IToolPanel {
  refresh(): void {
    throw new Error('Method not implemented.');
  }
  private params: IToolPanelParams;

  private numMedals: number;
  private numGold: number;
  private numSilver: number;
  private numBronze: number;

  agInit(params: IToolPanelParams): void {
    this.params = params;

    this.numMedals = 0;
    this.numGold = 0;
    this.numSilver = 0;
    this.numBronze = 0;

    // calculate stats when new rows loaded, i.e. onModelUpdated
    /* this.params.api.addEventListener(
      'modelUpdated',
      this.updateTotals.bind(this)
    ); */
  }
}
