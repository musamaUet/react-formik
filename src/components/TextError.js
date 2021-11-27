function TextError(props) {
  console.log('props.children', props);
  return <div className='error'>{props.children}</div>;
}
export default TextError;
