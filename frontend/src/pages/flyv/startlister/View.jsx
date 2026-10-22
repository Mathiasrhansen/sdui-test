import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import {
  FlightItem,
  List,
  StartInfo,
  StartItem,
  Total,
  ViewTemplate,
} from "@/components/Startliste";
import {
  useStartList,
  formatMinutes,
  formatPrice,
  formatDate,
} from "@/lib/startlists";

export default function View() {
  const [params] = useSearchParams();
  const { data, isPending, isError } = useStartList(params.get("id"));

  return (
    <div>
      <Header
        label={data ? formatDate(data.date) : "Startliste"}
        parent="/flyv/startlister"
      />
      <ViewTemplate>
        {isPending && <p className="text-grey-600">Henter startliste...</p>}
        {isError && (
          <p className="text-grey-600">Kunne ikke hente startlisten.</p>
        )}
        {data && (
          <>
            <StartInfo
              location={data.location}
              startType={data.launch_method}
              starterAmmount={data.total.launch_count}
              starterTime={formatMinutes(data.total.flight_minutes)}
            />
            <List title="Flyregistrering">
              {data.aircraft.map((a) => (
                <FlightItem
                  key={a.callsign}
                  name={a.callsign}
                  type={a.model}
                  starters={a.launch_count}
                  time={formatMinutes(a.flight_minutes)}
                />
              ))}
            </List>
            <List title="Startliste">
              {data.items.map((i) => (
                <StartItem
                  key={i.id}
                  pilot={i.name}
                  initials={i.initials}
                  name={i.callsign}
                  starterAmmount={i.launch_count}
                  starterTime={formatMinutes(i.flight_minutes)}
                  price={formatPrice(i.price)}
                />
              ))}
            </List>
            <Total
              totalStarterAmmount={data.total.launch_count}
              totalPrice={formatPrice(data.total.price)}
            />
          </>
        )}
      </ViewTemplate>
      <Navbar />
    </div>
  );
}
