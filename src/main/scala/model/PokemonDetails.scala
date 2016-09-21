package model

import spray.json.{DefaultJsonProtocol, DeserializationException, JsNumber, JsObject, JsString, JsValue, RootJsonFormat}

case class PokemonDetails(id: BigDecimal, name: String, height: BigDecimal, weight: BigDecimal, sprite: String)

object PokemonDetails extends DefaultJsonProtocol {

  implicit object PokemonDetailsJsonFormat extends RootJsonFormat[PokemonDetails] {
    override def write(p: PokemonDetails) = JsObject(
      "id" -> JsNumber(p.id),
      "name" -> JsString(p.name),
      "height" -> JsNumber(p.height),
      "weight" -> JsNumber(p.weight),
      "sprite" -> JsString(p.sprite)
    )

    override def read(value: JsValue) = {
      value.asJsObject.getFields("id", "name", "height", "weight", "sprites") match {
        case Seq(JsNumber(id), JsString(name), JsNumber(height), JsNumber(weight), JsObject(sprites)) =>
          PokemonDetails(id, name, height, weight, sprites("front_default").convertTo[String])
        case _ =>
          throw DeserializationException("Pokemon details expected")
      }
    }
  }

}


