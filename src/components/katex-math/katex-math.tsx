import { Component, Host, Element, h } from '@stencil/core';
import katex from 'katex';

import { extractMath, Segment } from 'extract-math';
@Component({
    tag: 'katex-math',
    styleUrl: 'katex-math.css'
})
export class KatexMath {
    @Element() el: HTMLElement;

    componentDidLoad() {
        this.getSlottedContent();
    }
    private getSlottedContent() {
        const slottedCode: HTMLElement = this.el.querySelector("[slot='math']");
        if (slottedCode) {
            if (slottedCode.innerHTML) {
                var segments: Segment[] = extractMath(slottedCode.innerHTML);
                var renderedHTML = ""; segments.map((segment) => {
                    if (segment.math) {
                        renderedHTML += katex.renderToString(segment.raw, { displayMode: segment.type === 'display' });
                    }
                    else {
                        renderedHTML += segment.value;
                    }
                })
                slottedCode.innerHTML = renderedHTML;
            }
        }

    }


    render() {
        return <Host></Host>;

    }


}