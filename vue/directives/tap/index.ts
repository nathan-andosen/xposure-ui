import { DirectiveOptions } from 'vue';
import Hammer from 'hammerjs';

const TapDirective: DirectiveOptions = {
bind: (el: HTMLElement, binding: any, vnode) => {
    // cancel the click event
    el.addEventListener('click', (ev: Event) => {
      ev.preventDefault();
      ev.stopPropagation();
      return false;
    });
    // add the hammer js singletap event to the element
    let mc = new Hammer.Manager(el);
    mc.add(new Hammer.Tap({ event: 'singletap' }));
    mc.on('singletap', (ev) => {
      if(el.tagName.toLowerCase() === 'label' && ev) {
        ev.preventDefault();
        ev.srcEvent.preventDefault();
        ev.srcEvent.stopPropagation();
      }
      if(binding.value){
        if(typeof binding.value === 'function') {
          binding.value(ev);
        } else if(binding.value.constructor === {}.constructor) {
          if(binding.value.cb) {
            let arr: any[] = [ev];
            for(let key in binding.value) {
              if(key.indexOf('param') > -1) {
                arr.push(binding.value[key]);
              }
            }
            binding.value.cb.apply(null, arr);
          }
        } else {
          throw Error('Unknown parameters passed to tap directive');
        }
      }
    });
  }
};

export default TapDirective;