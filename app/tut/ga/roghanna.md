---
title: Roghanna agus Cinntí
prev: an-staitse
prev-text: An Stáitse
---

# Roghanna agus Cinntí

Go dtí seo, rinne gach ríomhchlár a scríobhamar an rud céanna. Tosaíonn an léirmhínitheoir ag barr
an ríomhchláir agus téann sé ó líne go líne díreach go dtí an bun.

Más mian linn rudaí níos casta a dhéanamh, ba chóir dúinn cinntí inár ríomhchláir a dhéanamh.

Le haghaidh é sin a dhéanamh, bainimid úsáid go príomha as an ráiteas "`má`{.setanta}". Leis an
ráiteas `má`{.setanta}, is féidir linn rud amháin a dhéanamh má tá slonn éigin fíor, nó rud eile
mura bhfuil.

Scríobhaimid ráiteas `má`{.setanta} mar seo:

```{.setanta .numberLines}
má < slonn éigin > {
    < cód le dhéanamh má tá an slonn fíor >
} nó {
    < cód le dhéanamh má tá an slonn bréagach >
}
```

**Ní chaithfidh tú an cuid `nó`{.setanta} a scríobh, tá sé roghnach. Tá cód mar seo ceart freisin:**

```{.setanta .numberLines}
má < slonn éigin > {
    < cód le dhéanamh má tá an slonn fíor >
}
```

## Sampla

Tosaímis leis an ríomhchlár a scríobhamar cheana. Faigheann an ríomhchlár ainm an t-úsáideoir agus
scríobhann sé é le "Dia duit" ar an gconsól.

```{.setanta .numberLines}
ainm := ceist("Cad is ainm duit?")
scríobh("Dia duit", ainm)
```

Bainimid úsáid as an gníomh `ceist`{.setanta} chun ceist a chuir ar an úsáideoir faoi a ainm.
Stórálaimid an freagra i athróg `ainm`{.setanta} agus ansin úsáidimid `scríobh`{.setanta} le
haghaidh an ainm a scríobh ar an gconsól.

Anois athraímis an ríomhchlár chun teachtaireacht speisialta a scríobh más é "Setanta" an ainm.
Bainimid úsáid as an oibritheoir `==`{.setanta} chun dhá píosa téacs a chuir i gcomparáid. Ansin
úsáidimid an ráiteas `má`{.setanta} chun rud difriúil a dhéanamh más "Setanta" é an luach.

{{{
ainm := ceist("Cad is ainm duit?")

má ainm == "Setanta" {
    scríobh("Fáilte romhat Setanta")
} nó {
    scríobh("Dia duit", ainm)
}
}}}

Bain triail as an cód sin. Má deirimid gurb é "Setanta" ár n-ainm, scríobhfaidh an ríomhchlár
"Fáilte romhat Setanta". Má deirimid aon rud eile, scríobhfaidh sé "Dia duit".

### Taispeántas

![An ráiteas má ag obair](../en/assets/ma-demo.gif)
