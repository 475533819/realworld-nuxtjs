/** 
 * 登录后跳转登录、注册页拦截
 */

export default function ({store, redirect}) {
  if(store.state.user) {
    return redirect('/')
  }
}
