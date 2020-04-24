import { Component, Prop, Watch, EventEmitter, Event,Host, Element, h } from '@stencil/core';
import katex from 'katex';

export interface KatexOptions {
  displayMode: boolean;
  output: 'html' | 'mathml' | 'htmlAndMathml';
  leqno: boolean;
  fleqn: boolean;
  throwOnError: boolean;
  errorColor: string;
  macros: any;
  minRuleThickness: number;
  colorIsTextColor: boolean;
  maxSize: number;
  maxExpand: number;
  strict: any;
  trust: any;
}
@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css'
})
export class MyComponent {
  @Element() el: HTMLElement;
  @Prop() expression: string;
  @Prop() options: KatexOptions;
  @Watch('options')
  async optionsChanged() {
    this.katexRender();
  }
  @Event() error!: EventEmitter<any>;




  componentWillLoad() {
    this.katexRender();
  }


  private katexRender() {
    try {
      katex.render(this.expression, this.el, {...this.options});
    } catch (error) {
      if (error instanceof katex.ParseError) {
        // KaTeX can't parse the expression
        let message = ("Error in LaTeX '" + this.expression + "': " + error.message)
          .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        this.error.emit(message)
      } else {
        this.error.emit(error); //other error
      }
    }

  }
  // private getDefaultOptions() {
  //   return {
  //     displayMode: false,
  //     output: 'htmlAndMathml',
  //     leqno: false,
  //     fleqn: false,
  //     throwOnError: true,
  //     errorColor: '#cc0000',
  //     macros: null,
  //     minRuleThickness: 0.4,
  //     colorIsTextColor: true,
  //     maxSize: Infinity,
  //     maxExpand: 1000,
  //     strict: "warn",
  //     trust: false
  //   };
  // }
  render() {
    return <Host></Host>;
   
  }


}