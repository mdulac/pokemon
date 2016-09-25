package model

import spray.json.{DefaultJsonProtocol, DeserializationException, JsArray, JsObject, JsString, JsValue, RootJsonFormat}

case class Generation(name: String)

object Generation extends DefaultJsonProtocol {

  implicit object GenerationJsonFormat extends RootJsonFormat[List[Generation]] {

    override def write(stats: List[Generation]) = JsArray(
      stats.map(g => JsObject(
        "name" -> JsString(g.name)
      ))
    )

    override def read(value: JsValue) = {
      value match {
        case JsArray(generations) =>
          generations
            .toList
            .map(v => v.asJsObject)
            .map { o =>
              o.getFields("version") match {
                case Seq(JsObject(generation)) =>
                  Generation(generation("name").convertTo[String])
              }
            }
        case _ =>
          throw DeserializationException("Pokemon generation expected")
      }
    }
  }

}
