export function EnabledMic(props) {
  return (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M16 20a5.333 5.333 0 005.333-5.333v-8a5.333 5.333 0 10-10.666
        0v8A5.333 5.333 0 0016 20zM13.333 6.667a2.667 2.667 0 115.334 0v8a2.667
        2.667 0 11-5.334 0v-8zm13.334 8a1.334 1.334 0 00-2.667 0 8 8 0 11-16 0
        1.333 1.333 0 00-2.667 0 10.667 10.667 0 009.334 10.573V28H12a1.334
        1.334 0 000 2.667h8A1.333 1.333 0 1020 28h-2.667v-2.76a10.666 10.666 0
        009.334-10.573z"
        fill={props.color}
      />
    </svg>
  );
}