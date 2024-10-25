function MagicLinkTemplate(props: { name: string; url: string }) {
  return (
    <div>
      <h1>Hey {props.name}</h1>
      <p>Click the link below to login</p>
      <a href={props.url} target="_blank">
        Login
      </a>
    </div>
  );
}

export { MagicLinkTemplate };
