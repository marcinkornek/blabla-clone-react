// variables
$gray-lightest: #f8f9fa;
$black: #000000;

body {
  font-family: 'Roboto', sans-serif;
  margin-top: 0;
  background-color: $gray-lightest;
}

a {
  color: $black;

  &:hover,
  &:active,
  &:focus {
    color: $black;
    text-decoration: none;
  }
}

#main {
  padding-top: 80px;
  padding-right: 0;
  padding-left: 0;

  @media (min-width: 992px) {
    padding-right: 15px;
    padding-left: 275px;
  }
}
