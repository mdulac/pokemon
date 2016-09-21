package model

import spray.json.{DefaultJsonProtocol, DeserializationException, JsNumber, JsObject, JsString, JsValue, RootJsonFormat}

case class AbstractPokemon(id: BigDecimal, name: String)

object AbstractPokemon extends DefaultJsonProtocol {

  implicit object PokemonJsonFormat extends RootJsonFormat[AbstractPokemon] {
    override def write(p: AbstractPokemon) = JsObject(
      "id" -> JsNumber(p.id),
      "name" -> JsString(p.name)
    )

    override def read(value: JsValue) = {
      value.asJsObject.getFields("id", "name") match {
        case Seq(JsNumber(id), JsString(name)) => AbstractPokemon(id, name)
        case _ => throw DeserializationException("Pokemon expected")
      }
    }
  }

}