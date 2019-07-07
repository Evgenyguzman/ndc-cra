import { SimpleLink } from "../ui/Links/Links";

export const Breadcrumbs = ({links}) => {
  <React.Fragment>
    {
      links.map((link)=>
        <SimpleLink to={link.href}>{link.title}</SimpleLink>
      )
    }
  </React.Fragment>
}