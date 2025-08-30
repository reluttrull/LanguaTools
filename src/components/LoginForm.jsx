export default function LoginForm({ login }) {

  const handleSubmit = async (credentials) => {

    const user = await loginAPI(credentials);
    login(user);

  }

  return (
    <form onSubmit={handleSubmit}>
       <input name="username"/>
       <input name="password" type="password"/>  
       <button type="submit">Login</button>
    </form>
  )
}