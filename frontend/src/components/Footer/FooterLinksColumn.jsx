const FooterLinksColumn = ({ category, links, index }) => (
  <div>
    <h3 className="text-lg font-medium mb-4 text-white capitalize">
      {category}
    </h3>
    <ul className="space-y-3">
      {links.map(({ name, href }, idx) => (
        <li key={idx}>
          <a href={href} className="text-gray-600 hover:text-teal-600 transition-all">
            {name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default FooterLinksColumn;
