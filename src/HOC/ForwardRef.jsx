const ForwardRef = Component => React.forwardRef((props, ref) => React.memo(<Component {...props} ref={ref} />));
export default ForwardRef;