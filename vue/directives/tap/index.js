import Hammer from 'hammerjs';

var TapDirective = {
    bind: function (el, binding, vnode) {
        // cancel the click event
        el.addEventListener('click', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            return false;
        });
        // add the hammer js singletap event to the element
        var mc = new Hammer.Manager(el);
        mc.add(new Hammer.Tap({ event: 'singletap' }));
        mc.on('singletap', function (ev) {
            if (el.tagName.toLowerCase() === 'label' && ev) {
                ev.preventDefault();
                ev.srcEvent.preventDefault();
                ev.srcEvent.stopPropagation();
            }
            if (binding.value) {
                if (typeof binding.value === 'function') {
                    binding.value(ev);
                }
                else if (binding.value.constructor === {}.constructor) {
                    if (binding.value.cb) {
                        var arr = [ev];
                        for (var key in binding.value) {
                            if (key.indexOf('param') > -1) {
                                arr.push(binding.value[key]);
                            }
                        }
                        binding.value.cb.apply(null, arr);
                    }
                }
                else {
                    throw Error('Unknown parameters passed to tap directive');
                }
            }
        });
    }
};

export default TapDirective;
