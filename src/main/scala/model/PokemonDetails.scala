package model

import spray.json.{DefaultJsonProtocol, DeserializationException, JsNumber, JsObject, JsString, JsValue, RootJsonFormat, _}

case class PokemonDetails(id: BigDecimal,
                          name: String,
                          order: BigDecimal,
                          types: List[Type],
                          height: BigDecimal,
                          weight: BigDecimal,
                          sprite: String,
                          generations: List[Generation],
                          stats: List[Stat])

object PokemonDetails extends DefaultJsonProtocol {

  implicit object PokemonDetailsJsonFormat extends RootJsonFormat[PokemonDetails] {
    override def write(p: PokemonDetails) = JsObject(
      "id" -> JsNumber(p.id),
      "name" -> JsString(p.name),
      "order" -> JsNumber(p.order),
      "types" -> p.types.toJson,
      "height" -> JsNumber(p.height),
      "weight" -> JsNumber(p.weight),
      "sprite" -> JsString(p.sprite),
      "generations" -> p.generations.toJson,
      "stats" -> p.stats.toJson
    )

    override def read(value: JsValue) = {
      value.asJsObject.getFields("id", "name", "order", "types", "height", "weight", "sprites", "game_indices", "stats") match {
        case Seq(JsNumber(id), JsString(name), JsNumber(order), types, JsNumber(height), JsNumber(weight), JsObject(sprites), generations, stats) =>
          PokemonDetails(
            id,
            name,
            order,
            types.convertTo[List[Type]],
            height,
            weight,
            sprites("front_default").convertTo[String],
            generations.convertTo[List[Generation]],
            stats.convertTo[List[Stat]]
          )
        case _ =>
          throw DeserializationException("Pokemon details expected")
      }
    }
  }

}


