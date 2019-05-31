import request from "../../node_modules/superagent";
import { navigate } from "gatsby";
import { graphql } from "gatsby"

class AuthService {

    login(login, password) {
        request
            .post('http://localhost:8081/auth')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                login,
                password
            })
            .end(function (err, res) {
                if (err) {
                    console.error(err);
                    return;
                }

                localStorage.setItem('user', res.body.user);
                localStorage.setItem('token', res.body.token);

                navigate('/');
            });
    }

    checkIsLoggedIn() {
        const token = localStorage.getItem('token');

        return request
            .get('http://localhost:8081/auth')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', `Bearer ${token}`)
            .send();
    }
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default AuthService;
