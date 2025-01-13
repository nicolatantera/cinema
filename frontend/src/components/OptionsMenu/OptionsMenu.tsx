import "./OptionsMenu.scss";
import { Country } from "@/utils/interfaces";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  countries: Country[];
  selectedCountry: Country;
  onHandleChange: (countryCode: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function OptionsMenu(props: Props) {
  const { countries, selectedCountry, onHandleChange } = props;

  function handleCountryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onHandleChange(e);
  }

  return (
    <div className="options-container">
      <select id="options-container" value={selectedCountry?.iso_3166_1 || ""} onChange={(e) => handleCountryChange(e)}>
        <option value="" disabled>
          Choose a country
        </option>
        {countries.map((country) => (
          <option key={country.iso_3166_1} value={country.iso_3166_1}>
            {country.english_name}
          </option>
        ))}
      </select>
    </div>
  );
}
