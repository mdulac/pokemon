package model

import spray.json.{DefaultJsonProtocol, DeserializationException, JsArray, JsObject, JsString, JsValue, RootJsonFormat}

case class PokemonName(name: String)

object PokemonName extends DefaultJsonProtocol {

  implicit object PokemonNameJsonFormat extends RootJsonFormat[List[PokemonName]] {
    override def write(pokemons: List[PokemonName]) = JsArray(
      pokemons.map(p => JsObject(
        "name" -> JsString(p.name)
      ))
    )

    override def read(value: JsValue) = {
      value match {
        case JsObject(fields) =>
          fields("pokemon") match {
            case JsArray(pokemon) =>
              pokemon
                .toList
                .map(v => v.asJsObject)
                .map { o =>
                  o.getFields("pokemon") match {
                    case Seq(JsObject(t)) =>
                      PokemonName(t("name").convertTo[String])
                  }
                }
          }
        case _ =>
          throw DeserializationException("Pokemon names expected")
      }
    }
  }

}
