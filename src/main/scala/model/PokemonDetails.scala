package model

import spray.json.{DefaultJsonProtocol, DeserializationException, JsArray, JsNumber, JsObject, JsString, JsValue, RootJsonFormat}
import spray.json._

case class PokemonDetails(id: BigDecimal, name: String, height: BigDecimal, weight: BigDecimal, sprite: String, stats: List[Stat])

object PokemonDetails extends DefaultJsonProtocol {

  implicit object PokemonDetailsJsonFormat extends RootJsonFormat[PokemonDetails] {
    override def write(p: PokemonDetails) = JsObject(
      "id" -> JsNumber(p.id),
      "name" -> JsString(p.name),
      "height" -> JsNumber(p.height),
      "weight" -> JsNumber(p.weight),
      "sprite" -> JsString(p.sprite),
      "stats" -> p.stats.toJson
    )

    override def read(value: JsValue) = {
      value.asJsObject.getFields("id", "name", "height", "weight", "sprites", "stats") match {
        case Seq(JsNumber(id), JsString(name), JsNumber(height), JsNumber(weight), JsObject(sprites), stats) =>
          PokemonDetails(
            id,
            name,
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


