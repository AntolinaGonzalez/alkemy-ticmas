import Container from "react-bootstrap/Container";
import Footer from "./footer";
import Head from "next/head";

function Layout({ children }) {
  return (
    <div>
      <Container fluid>
        <Head>
          <title>Ticmas</title>
          
        </Head>
        {children}
        <Footer></Footer>
      </Container>
    </div>
  );
}

export default Layout;
