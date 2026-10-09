if (pending & timer_mask) timer_ih();
if (pending & keyboard_mask) keyboard_ih();
