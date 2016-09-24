package model

import spray.json.{DefaultJsonProtocol, DeserializationException, JsNumber, JsObject, JsString, JsValue, RootJsonFormat, _}

case class PokemonDetails(id: BigDecimal,
                          name: String,
                          types: List[Type],
                          height: BigDecimal,
                          weight: BigDecimal,
                          sprite: String,
                          stats: List[Stat])

object PokemonDetails extends DefaultJsonProtocol {

  implicit object PokemonDetailsJsonFormat extends RootJsonFormat[PokemonDetails] {
    override def write(p: PokemonDetails) = JsObject(
      "id" -> JsNumber(p.id),
      "name" -> JsString(p.name),
      "types" -> p.types.toJson,
      "height" -> JsNumber(p.height),
      "weight" -> JsNumber(p.weight),
      "sprite" -> JsString(p.sprite),
      "stats" -> p.stats.toJson
    )

    override def read(value: JsValue) = {
      value.asJsObject.getFields("id", "name", "types", "height", "weight", "sprites", "stats") match {
        case Seq(JsNumber(id), JsString(name), types, JsNumber(height), JsNumber(weight), JsObject(sprites), stats) =>
          PokemonDetails(
            id,
            name,
            types.convertTo[List[Type]],
            height,
            weight,
            sprites("front_default").convertTo[String],
            stats.convertTo[List[Stat]]
          )
        case _ =>
          throw DeserializationException("Pokemon details expected")
      }
    }
  }

}


