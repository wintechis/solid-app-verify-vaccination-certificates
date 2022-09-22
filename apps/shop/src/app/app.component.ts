import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, Observable } from "rxjs";
import { getSolidDataset, getThingAll } from "@inrupt/solid-client";
import {
  VaccinationProof,
  VaccinationProofDeserializer,
} from "@solid-app-verifiable-credentials/vaccination-data";

@Component({
  selector: "solid-app-verifiable-credentials-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements AfterViewInit {
  title = "shop";
  proofValid = false;

  proofUri: Observable<string | null> = this.activatedRoute.queryParamMap.pipe(
    map((paramMap) => {
      return paramMap.get("proofUri");
    })
  );

  constructor(private activatedRoute: ActivatedRoute) {}

  redirect() {
    const webId = encodeURIComponent(
      "https://wiesnery.solidcommunity.net/profile/card#me"
    );
    const redirectUri = encodeURIComponent("http://localhost:4202");
    window.location.href = `http://localhost:4201/?webId=${webId}&redirectUri=${redirectUri}`;
  }

  ngAfterViewInit(): void {
    this.activatedRoute.queryParamMap.subscribe((value) => {
      if (!this.proofValid) {
        const uri = value.get("proofUri");
        if (uri != null) {
          this.validateCertificate(uri);
        }
      }
    });
  }

  private async validateCertificate(uri: string) {
    const ds = await getSolidDataset(uri!);
    const things = getThingAll(ds);
    const deserializer = new VaccinationProofDeserializer();
    const vaccinationProof = things
      .filter((thing) => deserializer.checkType(thing))
      .reduce((map, thing) => {
        const vaccinationProof = deserializer.deserialize(thing);
        map.set(thing.url, vaccinationProof);
        return map;
      }, new Map<string, VaccinationProof>());

    const vaccinationProofs = Array.from(vaccinationProof.values());
    if (
      vaccinationProofs.filter((proof) => proof.expiryDate > new Date())
        .length > 0
    ) {
      this.proofValid = true;
      alert("Certificate is valid");
    }
  }
}
