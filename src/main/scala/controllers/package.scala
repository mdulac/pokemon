import scala.concurrent.Future

package object controllers {

  type Process[A, B] = A => Future[B]

}
