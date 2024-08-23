export async function getCountry() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  if (!res) throw new Error("no network for country");

  const data = await res.json();
  return data;
}

export async function upDateState(country) {
  const res = await fetch(
    "https://countriesnow.space/api/v0.1/countries/states",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country }),
    }
  );
  const data = await res.json();

  return data.data ? data.data.states : [];
}
