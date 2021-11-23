function YoutubeForm(props) {
  return (
    <form>
      <label htmlFor='name'>Name</label>
      <input type='text' name='name' id='name' />
      <label htmlFor='password'>E-mail</label>
      <input type='email' name='email' id='email' />
      <label htmlFor='channel'>Channel</label>
      <input type='text' name='channel' id='channel' />
      <button>Submit</button>
    </form>
  );
}

export default YoutubeForm;
